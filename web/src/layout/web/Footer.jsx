import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made with ❤️ by {" "}
              <a href="https://github.com/racingboi/serve-node" className="text-decoration-underline text-dark fs-5" target="_blank" rel="noreferrer">Trương Công Đức</a>
            </p>
            <a className="text-dark fs-4" href="https://github.com/racingboi" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
