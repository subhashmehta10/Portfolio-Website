export function getUsers(){
  try {
    const list = JSON.parse(localStorage.getItem('auth-users')||'[]')
    const seen = new Set()
    const unique = []
    for (const u of list) {
      const key = (u && u.email) ? String(u.email).toLowerCase() : ''
      if (!key || seen.has(key)) continue
      seen.add(key)
      unique.push(u)
    }
    return unique
  } catch { return [] }
}
export function addUser(user){
  const users = getUsers()
  const email = (user && user.email) ? String(user.email).toLowerCase() : ''
  if (!email || users.some(u => String(u.email).toLowerCase() === email)) return
  users.push(user)
  try { localStorage.setItem('auth-users', JSON.stringify(users)) } catch {}
}
export function getSales(){
  // demo monthly sales for current and previous year
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const thisYear = months.map((_,i)=> Math.round(50000 + Math.random()*50000) )
  const prevYear = months.map((_,i)=> Math.round(30000 + Math.random()*40000) )
  return { months, thisYear, prevYear }
}

