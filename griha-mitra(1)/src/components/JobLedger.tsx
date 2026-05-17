import { useState, useEffect } from "react";
import { Plus, IndianRupee, Trash2, Calendar } from "lucide-react";
import { Job } from "../types";

export default function JobLedger() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [task, setTask] = useState("");
  const [amount, setAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Load from local storage sync logic
  useEffect(() => {
    const saved = localStorage.getItem('grihamitra_jobs');
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  const saveJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem('grihamitra_jobs', JSON.stringify(newJobs));
  };

  const addJob = () => {
    if (!task || !amount) return;
    const newJob: Job = {
      id: Date.now().toString(),
      task,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };
    saveJobs([newJob, ...jobs]);
    setTask("");
    setAmount("");
    setIsAdding(false);
  };

  const deleteJob = (id: string) => {
    saveJobs(jobs.filter(j => j.id !== id));
  };

  const totalEarnings = jobs.reduce((acc, job) => acc + job.amount, 0);

  return (
    <div className="pb-24">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="brutal-header text-primary">Job Ledger</h2>
          <p className="font-bold text-slate-500 uppercase text-xs">Manage Earnings</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="brutal-btn-primary p-3 rounded-none"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="brutal-card p-6 bg-slate-900 text-white mb-8">
        <p className="text-xs font-black uppercase opacity-60 mb-1">Total Earnings</p>
        <div className="flex items-center gap-2">
          <IndianRupee size={32} className="text-warning" />
          <span className="text-4xl font-black">{totalEarnings.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {isAdding && (
        <div className="brutal-card p-6 mb-8 bg-slate-50 border-dashed">
          <h3 className="font-black uppercase mb-4 text-sm">Add New Task</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What task? (e.g. Ironing)"
              className="w-full border-4 border-black p-3 font-bold focus:outline-none"
            />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full border-4 border-black p-3 pl-10 font-bold focus:outline-none"
                />
              </div>
              <button onClick={addJob} className="brutal-btn-primary px-8">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-black uppercase text-sm border-b-4 border-black pb-1 mb-4">Recent Jobs</h3>
        {jobs.length === 0 ? (
          <div className="text-center py-10 opacity-30 font-black uppercase">No jobs recorded yet</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="brutal-card p-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-2 border-2 border-black bg-slate-100 flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase">{job.date.split(' ')[1]}</span>
                  <span className="text-sm font-black">{job.date.split(' ')[0]}</span>
                </div>
                <div>
                  <p className="font-black text-lg leading-none mb-1">{job.task}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                     <IndianRupee size={10} /> {job.amount}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => deleteJob(job.id)}
                className="p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
