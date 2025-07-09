// components/common/footer
const Footer = () => {
  return (
    <footer className="py-3 bg-light" style={{ marginLeft: "225px" }}>
      <div className="d-flex justify-content-center w-100">
        <span className="small text-muted">
          Copyright © Payroll App {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
