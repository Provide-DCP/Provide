import { useEffect, useState } from "react";

export const Stats = ({ orders }) => {
  const [pendingOrders, setPendingOrders] = useState(0);
  const [finishedOrders, setFinishedOrders] = useState(0);
  useEffect(() => {
    let fo = 0;
    let po = 0;
    orders?.forEach((order) => {
      if (order.status === 4) fo = fo + 1;
      else po = po + 1;
    });
    setFinishedOrders(fo);
    setPendingOrders(po);
  }, [orders]);
  const stats = [
    { name: "Total Orders", stat: orders?.length },
    { name: "Finished Orders", stat: finishedOrders },
    { name: "Pending Orders", stat: pendingOrders },
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
