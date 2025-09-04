import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
import ApplicantStatistics from "../components/ApplicantStatistics"; // Import new component

const handleButtonClick = (e) => {
  const buttons = document.querySelectorAll(
    ".account .container .sidebar .sidebar_links button"
  );
  buttons.forEach((btn) => (btn.style.color = "")); // Reset other buttons
  e.target.style.color = "yellow"; // Set active button color
};

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  return (
    <>
      <section className="account">
        <div className="component_header">
          <p>Dashboard</p>
          <p>
            Welcome! <span>{user && user.name}</span>
          </p>
        </div>
        <div className="container">
          <div className={show ? "sidebar showSidebar" : "sidebar"}>
            <ul className="sidebar_links">
              <h4>Manage Account</h4>
              <li>
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                >
                  Update Password
                </button>
              </li>
              {user && user.role === "Employer" && (
                <>
                  <li>
                    <button
                      onClick={(e) => {
                        handleButtonClick(e);
                        setComponentName("Job Post");
                        setShow(!show);
                      }}
                    >
                      Post New Job
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        handleButtonClick(e);
                        setComponentName("My Jobs");
                        setShow(!show);
                      }}
                    >
                      My Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        handleButtonClick(e);
                        setComponentName("Applications");
                        setShow(!show);
                      }}
                    >
                      Applications
                    </button>
                  </li>
                </>
              )}
              {user && user.role === "Job Seeker" && (
                <>
                  <li>
                    <button
                      onClick={(e) => {
                        handleButtonClick(e);
                        setComponentName("My Applications");
                        setShow(!show);
                      }}
                    >
                      My Applications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        handleButtonClick(e);
                        setComponentName("Applicant Statistics");
                        setShow(!show);
                      }}
                    >
                      Applicant Statistics
                    </button>
                  </li>
                </>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="banner">
            <div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>
            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                case "Job Post":
                  return <JobPost />;
                case "My Jobs":
                  return <MyJobs />;
                case "Applications":
                  return <Applications />;
                case "My Applications":
                  return <MyApplications />;
                case "Applicant Statistics":
                  console.log(user._id);
                  
                  return <ApplicantStatistics userId={user?._id} />;
                default:
                  return <MyProfile />;
              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
