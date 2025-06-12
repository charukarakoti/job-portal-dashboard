export default function StatsCards({ applications }) {
  const total = applications.length;
  const accepted = applications.filter(app => app.status === 'accepted').length;
  const rejected = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <Card title="Total Applications" count={total} icon="📄" color="blue" />
      <Card title="Accepted" count={accepted} icon="✅" color="green" />
      <Card title="Rejected" count={rejected} icon="❌" color="red" />
    </div>
  );
}

function Card({ title, count, icon, color }) {
  const bg = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
  }[color];

  return (
    <div className={`flex items-center p-5 rounded-xl shadow-md ${bg}`}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-sm uppercase font-semibold tracking-wide">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}
