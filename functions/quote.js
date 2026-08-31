export async function onRequestPost({request,env}){
  const d=await request.json();
  if(!d.first_name||!d.email||!d.phone) return Response.json({ok:false,error:'Missing required fields'},{status:400});
  const id=crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO leads (id,type,first_name,last_name,email,phone,address,service,preferred_date,message,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now'))`).bind(id,'quote',d.first_name,d.last_name||'',d.email,d.phone,d.address||'',d.service||'',d.preferred_date||'',d.message||'','new').run();
  await env.DB.prepare(`INSERT INTO notifications (id,type,title,message,status,created_at) VALUES (?,?,?,?,?,datetime('now'))`).bind(crypto.randomUUID(),'lead','New quote request',`${d.first_name} ${d.last_name||''} requested ${d.service||'service'}`,'unread').run();
  return Response.json({ok:true,id});
}