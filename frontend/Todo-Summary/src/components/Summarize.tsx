import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const backendurl = import.meta.env.VITE_APP_URL;
export const Summarize = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [slackLoading, setSlackLoading] = useState(false);

  useEffect(() => {
    const handleSummarizeTools = async () => {
      setLoading(true);
      try {
        const getResponse = await axios.get(`${backendurl}/summarize`);

        if (getResponse.status === 200 && getResponse.data) {
          const todos = getResponse.data;
          const postResponse = await axios.post(`${backendurl}/summarize`, { todos });
          if (postResponse.status === 200 && postResponse.data.summary) {
            setSummary(postResponse.data.summary);
          }
        }
      } catch (error) {
        console.error("Error summarizing todos:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSummarizeTools();
  }, []);

  const handleSendToSlack = async () => {
    const confirmSend = window.confirm("Are you sure you want to send this summary to the Slack channel?");
    if (!confirmSend) return;

    try {
      setSlackLoading(true);
      const response = await axios.post(`${backendurl}/summarize/slack`, { summary });
      if (response.status === 200) {
        toast("✅ Summary successfully sent to Slack!");
        window.open("https://app.slack.com/client/T08TNBBQFPU/C08TPKMDRA8?entry_point=redirect_flow");
      } else {
        toast("❌ Failed to send summary to Slack.");
      }
    } catch (error) {
      console.error("Slack send error:", error);
      toast("❌ Error sending to Slack.");
    } finally {
      setSlackLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-info" style={{ width: "4rem", height: "4rem" }} role="status">
            <span className="visually-hidden">summarizing...</span>
          </div>
        </div>
      )}

      {!loading && summary && (
        <div className="container mt-5">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Summary of Pending Todos</h5>
              <button
                className="btn btn-light btn-sm"
                onClick={handleSendToSlack}
                disabled={slackLoading}
              >
                {slackLoading ? "Sending..." : "Send to Slack"}
              </button>
            </div>
            <div className="card-body">
              <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
            </div>
          </div>
          <ToastContainer/>
        </div>
      )}
    </>
  );
};
