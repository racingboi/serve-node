const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')
const validator = require('validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    // Kiểm tra các trường bắt buộc nhập
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập đầy đủ thông tin'
        });
    }
    // Kiểm tra định dạng email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Email không hợp lệ'
        });
    }
    // kiểm tra mật khẩu
    if (password.length !== 8) {
        return res.status(400).json({
            success: false,
            message: 'Mật khẩu phải đúng 8 ký tự!'
        });
    }
    // kiem tra so dien thoai 
    const phoneNumber = parsePhoneNumberFromString(mobile, 'VN'); // 'VN' là mã quốc gia cho Việt Nam, thay đổi tùy quốc gia của bạn
    if (!phoneNumber || !phoneNumber.isValid()) {
        return res.status(400).json({
            success: false,
            message: 'Số điện thoại không hợp lệ'
        });
    }
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Người dùng đã tồn tại'
        });
    }

    // Tạo người dùng mới
    const newUser = await User.create(req.body);

    if (newUser) {
        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công. Vui lòng đăng nhập!'
        });
    } else {
        // Xử lý trường hợp tạo người dùng không thành công do lý do khác
        return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra'
        });
    }
});

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            message: 'Vui lòng nhập đầy đủ thông tin'
        });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        // No user found with the given email
        return res.status(401).json({
            message: 'Không tìm thấy người dùng'
        });
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect) {
        // Wrong password
        return res.status(401).json({
            message: 'Mật khẩu không đúng'
        });
    }

    // Extract required details and create tokens
    const { _id, role } = user;
    const accessToken = generateAccessToken(_id, role);
    const newRefreshToken = generateRefreshToken(_id);

    // Update user with new refresh token
    await User.findByIdAndUpdate(_id, { refreshToken: newRefreshToken }, { new: true });

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });

    // Successful authentication
    return res.status(200).json({
        success: true,
        accessToken,
        userData: user.toObject({ versionKey: false, getters: true })
    });
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        res: user ? user : 'Không tìm thấy người dùng'
    })
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookies
    const cookie = req.cookies
    // Check xem có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('Không có mã thông báo làm mới trong cookie')
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Mã thông báo làm mới không khớp'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('Không có mã thông báo làm mới trong cookie')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
    })
})
// Client gửi email
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Client check mail => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error('Thiếu email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('Không tìm thấy người dùng')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Vui lòng nhập đầy đủ thông tin')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Mã đặt lại không hợp lệ')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Đã cập nhật mật khẩu' : 'Đã xảy ra lỗi'
    })
})
const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('Vui lòng nhập đầy đủ thông tin')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `Người dùng có email ${response.email} đã xóa` : 'Không có người dùng nào xóa'
    })
})
const updateUser = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Đã xảy ra lỗi'
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    // 
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Vui lòng nhập đầy đủ thông tin')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Đã xảy ra lỗi'
    })
})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}