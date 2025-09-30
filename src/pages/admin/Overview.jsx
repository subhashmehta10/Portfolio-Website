import AdminChart from '../../components/AdminChart.jsx'
import { getUsers, getSales } from '../../utils/adminData.js'

function currency(n){ return `₹${Number(n||0).toLocaleString('en-IN')}` }

function Overview(){
  const users = getUsers()
  const sales = getSales()
  const totalThisYear = sales.thisYear.reduce((a,b)=>a+b,0)
  const totalPrevYear = sales.prevYear.reduce((a,b)=>a+b,0)
  const diff = totalThisYear - totalPrevYear
  const diffPct = ((diff/Math.max(1,totalPrevYear))*100).toFixed(1)

  return (
    <div>
      <h2>Overview</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom: 12}}>
        <div className="home__card"><strong>Revenue (YTD)</strong><div>{currency(totalThisYear)}</div></div>
        <div className="home__card"><strong>Revenue vs LY</strong><div>{currency(diff)} ({diffPct}%)</div></div>
        <div className="home__card"><strong>Users</strong><div>{users.length}</div></div>
        <div className="home__card"><strong>Orders</strong><div>—</div></div>
      </div>

      <div className="home__card">
        <h3>Monthly Sales</h3>
        <AdminChart seriesA={sales.thisYear} seriesB={sales.prevYear} labels={sales.months} />
      </div>
    </div>
  )
}
export default Overview


