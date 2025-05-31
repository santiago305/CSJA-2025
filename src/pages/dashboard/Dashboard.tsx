export default function Dashboard () {
  return (
    <div
    className="flex-1 h-full flex flex-col"
    >
      <h3
      className="text-2xl font-semibold text-gray-800 dark:text-white mb-6"
      >
        Dashboard
      </h3>

      <div
      className="w-full min-h-full flex flex-wrap gap-4"
      >
        <div className="min-w-[500px] flex-1 md:w-2/1 lg:w-3/1 p-4 bg-white rounded-3xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Basic Area Chart</h4>
        </div>
        <div className="min-w-[500px] flex-1 md:w-2/1 lg:w-3/1 p-4 bg-white rounded-3xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Area Spaline Chart</h4>
        </div>  
        <div className="min-w-[500px] flex-1 md:w-2/1 lg:w-3/1 p-4 bg-white rounded-3xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Bar chat</h4>
        </div>
        <div className="min-w-[500px] flex-1 md:w-2/1 lg:w-3/1 p-4 bg-white rounded-3xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Pie Chart</h4>
        </div>
        <div className="min-w-[500px] flex-1 md:w-2/1 lg:w-3/1 p-4 bg-white rounded-3xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Mixed Char</h4>
        </div>
      </div>
    </div>
  );
}