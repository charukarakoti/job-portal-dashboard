export default function StatsCards({ applications }) {
    const total = applications.length;
    const accepted = applications.filter(app => app.status === 'accepted').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card title="Total Applications" count={total} color="blue" />
        <Card title="Accepted" count={accepted} color="green" />
        <Card title="Rejected" count={rejected} color="red" />
      </div>
    );
  }
  
  function Card({ title, count, color }) {
    const bg = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
    }[color];
  
    return (
      <div className={`p-6 rounded shadow ${bg}`}>
        <h3 className="text-sm font-medium uppercase">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    );
  }
  