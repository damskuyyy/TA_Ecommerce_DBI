import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderProgress: React.FC = () => {
  const timeline = [
    {
      time: "23 Jan, 2021 at 7:32 PM",
      message: "Your order has been finished. Thank you for shopping at DBIX!",
    },
    {
      time: "23 Jan, 2021 at 7:32 PM",
      message: "Your order has been finished. Thank you for shopping at DBIX!",
    },
    {
      time: "23 Jan, 2021 at 7:32 PM",
      message: "Your order has been finished. Thank you for shopping at DBIX!",
    },
    {
      time: "23 Jan, 2021 at 7:32 PM",
      message: "Your order has been finished. Thank you for shopping at DBIX!",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-lg text-muted-foreground cursor-pointer">View Progress</div>

      <Card className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center">
        <div>
          <div className="font-semibold">#9694540</div>
          <div className="text-sm text-gray-500">Products Apps • Order Placed at 17 Jan, 2021 at 7:32 PM</div>
        </div>
        <div className="text-xl font-bold">$1199.00</div>
      </Card>

      <div className="flex justify-around items-center">
        {['Order Placed', 'Process', 'Completed'].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-black dark:bg-white" />
            <div className="text-sm mt-2">{step}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-lg font-semibold mb-4">completed process</div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle className="w-5 h-5 text-black dark:text-white mt-1" />
                <div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{item.message}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderProgress;
