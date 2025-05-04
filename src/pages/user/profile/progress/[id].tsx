import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";

const OrderProgress: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [progressData, setProgressData] = useState<any[]>([]);
  const [contractData, setContractData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Ambil data progress
        const [progressRes, contractRes] = await Promise.all([
          axios.get(`/api/contract/progress/get/${id}`),
          axios.get(`/api/contract/get?id=${id}`),
        ]);

        setProgressData(progressRes.data);
        setContractData(contractRes.data);
      } catch (err) {
        console.error("❌ Failed to fetch progress or contract", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="text-lg text-muted-foreground cursor-pointer">
        View Progress
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {contractData && (
            <Card className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold">#{contractData.id}</div>
                <div className="text-sm text-gray-500">
                  {contractData.product?.name} • Order Placed at{" "}
                  {new Date(contractData.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-xl font-bold">
                {contractData.cost ? `${contractData.cost}` : "-"}
              </div>
            </Card>
          )}

          <div className="flex justify-around items-center">
            {["Order Placed", "Process", "Completed"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-black dark:bg-white" />
                <div className="text-sm mt-2">{step}</div>
              </div>
            ))}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-lg font-semibold mb-4">
                Completed Process
              </div>
              <div className="space-y-4">
                {progressData.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-black dark:text-white mt-1" />
                    <div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        {item.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default OrderProgress;
