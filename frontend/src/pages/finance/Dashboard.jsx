// pages/finance/dashboard
import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import SummaryCard from "../../components/finance/SummaryCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCheckCircle,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const name = res.data?.user?.employee?.full_name;
        setFullName(name || "Finance User");
      } catch {
        setFullName("Finance User");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h4 className="fw-semibold mb-4">
        {getGreeting()}, <span style={{ color: "#1071B9" }}>{fullName}!</span>
      </h4>

      <div className="row g-3">
        <div className="col-md-4">
          <SummaryCard
            title="Total Payroll"
            value="Rp 200.000.000"
            icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
            color="#198754"
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Payroll Status"
            value="Final"
            icon={<FontAwesomeIcon icon={faCheckCircle} />}
            color="#0d6efd"
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title="Payslips Sent"
            value="11"
            smallValue="/15"
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
            color="#fd7e14"
          />
        </div>
      </div>
    </div>
  );
}

