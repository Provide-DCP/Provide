import { useEffect, useState } from "react";
export const Stats = ({ requests }) => {
  const [pendingRequests, setPendingRequests] = useState(0);
  const [finishedRequests, setFinishedRequests] = useState(0);
  useEffect(() => {
    let fo = 0;
    let po = 0;
    requests?.forEach((request) => {
      if (request.finished) fo = fo + 1;
      else po = po + 1;
    });
    setFinishedRequests(fo);
    setPendingRequests(po);
  }, [requests]);
  const stats = [
    { name: "Total Requests", stat: requests?.length },
    { name: "Finished Requests", stat: finishedRequests },
    { name: "Pending Requests", stat: pendingRequests },
  ];
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat.toString().length < 2 ? `0${item.stat}` : item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
