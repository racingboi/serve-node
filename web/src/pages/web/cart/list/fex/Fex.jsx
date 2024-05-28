import  { useEffect, useState } from 'react'
import axios from 'axios';
export default function Fex() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [fee, setFee] = useState(0);
  const apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api';
  const apiKey = '7293aab0-b9b0-11ee-b38e-f6f098158c7e';

  useEffect(() => {
    fetchProvinceData();
  }, []);

  useEffect(() => {
    if (selectedProvince) fetchDistrictsData(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsData(selectedDistrict);
      fetchService(selectedDistrict)
        .then(serviceId => setSelectedServiceId(serviceId))
        .catch(error => console.error(error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard && selectedDistrict && selectedServiceId) {
      fetchFee(selectedWard, selectedDistrict, selectedServiceId);
    }
  }, [selectedWard, selectedDistrict, selectedServiceId]);

  const fetchProvinceData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/province`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
      });
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tỉnh:', error);
    }
  };

  const fetchDistrictsData = async (provinceId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/district`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: { province_id: provinceId },
      });
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu quận/huyện:', error);
    }
  };

  const fetchWardsData = async (districtId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/ward`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: { district_id: districtId },
      });
      setWards(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu phường/xã:', error);
    }
  };

  const fetchService = async (districtId) => {
    try {
      const serviceResponse = await axios.get(`${apiUrl}/v2/shipping-order/available-services`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: {
          shop_id: 4868495,
          from_district: 1788,
          to_district: districtId,
        },
      });

      if (serviceResponse.data.data && serviceResponse.data.data.length > 0) {
        const firstService = serviceResponse.data.data[0];
        return firstService.service_id;
      } else {
        console.log('Không tìm thấy dịch vụ nào.');
        return '';
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
      throw error;
    }
  };

  const fetchFee = async (wardCode, districtId, serviceId) => {
    try {
      const feeResponse = await axios.get(`${apiUrl}/v2/shipping-order/fee`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: {
          from_district_id: 1788,
          to_district_id: districtId,
          to_ward_code: wardCode,
          service_id: serviceId,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: 0,
        },
      });

      if (feeResponse.data && feeResponse.data.data) {
        setFee(feeResponse.data.data.total);
      } else {
        console.log('Lỗi khi tính phí: Không nhận được dữ liệu');
      }
    } catch (error) {
      console.error('Lỗi khi lấy phí:', error);
    }
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
    setSelectedWard('');
    setSelectedServiceId('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedWard('');
    setSelectedServiceId('');
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-8 order-md-1">
          <div className="row">
            <div className="col-md-12">
              <div className="container mt-4">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="province" className="form-label">Tỉnh:</label>
                    <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                      <option value="" disabled>--chọn tỉnh--</option>
                      {provinces.map((province) => (
                        <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="districts" className="form-label">Quận/Huyện:</label>
                    <select id="districts" className="form-select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                      <option value="" disabled>--chọn quận/huyện--</option>
                      {districts.map((district) => (
                        <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="ward" className="form-label">Phường/Xã:</label>
                    <select id="ward" className="form-select" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                      <option value="" disabled>--chọn phường/xã--</option>
                      {wards.map((ward) => (
                        <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
