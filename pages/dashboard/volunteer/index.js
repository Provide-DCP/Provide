import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { Chart } from "../../../src/components/Provider/Chart";
import { Header } from "../../../src/components/Layouts/Header";
import { Stats } from "../../../src/components/Volunteer/Stats";

const Index = ({ requests }) => {
  const [values, setValues] = useState(null);
  useEffect(() => {
    let count = [0, 0, 0, 0, 0, 0];
    requests?.map((request) => {
      const time = new Date(request.createdAt);
      const today = new Date(Date.now());
      const day = time.getDate();
      const month = time.getMonth();
      const year = time.getFullYear();
      if (month === today.getMonth() && year === today.getFullYear())
        count[Math.ceil(day / 5) - 1] += 1;
    });
    setValues(count);
  }, []);

  return (
    <>
      <Header heading={"Dashboard"} />
      <main className="relative -mt-40 pb-20">
        <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mt-5">
                <Stats requests={requests} />
                {values && (
                  <Chart
                    data={{
                      labels: ["0", "5", "15", "20", "25", "30"],
                      datasets: [
                        {
                          label: "Your Orders",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: "rgba(75,192,192,0.4)",
                          borderColor: "rgba(75,192,192,1)",
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: "rgba(75,192,192,1)",
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(75,192,192,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: values,
                        },
                      ],
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.userDetails) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (session.userDetails.category !== "volunteer") {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer"
            ? `/customer/stores`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }
  const {
    data: { requests },
  } = await axios.get(`${process.env.HOST_URL}/api/requests?volunteerId=${session.userId}`);
  return {
    props: {
      requests,
    },
  };
};
export default Index;
