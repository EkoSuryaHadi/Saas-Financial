import React from 'react';

const SkeletonDashboard: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-32 flex flex-col justify-center">
            <div className="h-4 bg-slate-100 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-100 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* AI Analyst Skeleton */}
      <div className="bg-slate-800 rounded-xl shadow-lg min-h-[200px] p-6 border border-slate-700 mb-8">
        <div className="flex justify-between mb-6">
           <div className="flex gap-3 items-center">
               <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
               <div className="space-y-2">
                   <div className="h-4 bg-slate-700 rounded w-32"></div>
                   <div className="h-3 bg-slate-700 rounded w-20"></div>
               </div>
           </div>
           <div className="h-8 bg-slate-700 rounded w-24"></div>
        </div>
        <div className="space-y-3">
            <div className="h-3 bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
            <div className="h-3 bg-slate-700 rounded w-4/6"></div>
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 h-[350px]">
             <div className="h-6 bg-slate-100 rounded w-1/4 mb-4"></div>
             <div className="h-full bg-slate-50 rounded w-full"></div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[350px]">
                <div className="h-6 bg-slate-100 rounded w-1/4 mb-4"></div>
                <div className="h-full bg-slate-50 rounded w-full"></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[350px]">
                <div className="h-6 bg-slate-100 rounded w-1/4 mb-4"></div>
                <div className="h-full bg-slate-50 rounded w-full"></div>
            </div>
         </div>
      </div>
      
      {/* Table Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-64 p-6">
         <div className="flex justify-between mb-6">
            <div className="h-6 bg-slate-100 rounded w-48"></div>
            <div className="h-6 bg-slate-100 rounded w-24"></div>
         </div>
         <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-slate-50 rounded w-full"></div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;