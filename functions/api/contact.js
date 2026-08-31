export async function onRequestPost({request,env}){
  const d=await request.json(); if(!d.name||!d.email||!d.message) return Response.json({ok:false},{status:400});
  const id=crypto.randomUUID(); await env.DB.prepare(`INSERT INTO leads (id,type,first_name,email,message,status,created_at) VALUES (?,?,?,?,?,?,datetime('now'))`).bind(id,'contact',d.name,d.email,d.message,'new').run();
  await env.DB.prepare(`INSERT INTO notifications (id,type,title,message,status,created_at) VALUES (?,?,?,?,?,datetime('now'))`).bind(crypto.randomUUID(),'contact','New contact message',`Message from ${d.name}`,'unread').run(); return Response.json({ok:true,id});
}