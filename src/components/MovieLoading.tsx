const MovieLoading = () => {
  return (
    <div className="grow m-2 p-3 flex flex-col justify-between">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-5 py-1">
          <div className="h-52 bg-slate-700 rounded" />
          <div className="space-y-2">
            <div className="h-6 bg-slate-700 rounded" />
            <div className="h-6 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieLoading;
