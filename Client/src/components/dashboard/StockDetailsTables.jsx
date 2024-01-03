import React from "react";

const StockDetailsTables = ({ title, headings, data }) => {
  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
            <div className="min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>{headings}</tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {data}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StockDetailsTables;
