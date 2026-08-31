export async function onRequest({request,env}){
  if(request.method==='GET'){const {results}=await env.DB.prepare(`SELECT * FROM inventory ORDER BY item`).all();return Response.json({ok:true,items:results});}
  if(request.method==='POST'){const d=await request.json();await env.DB.prepare(`INSERT INTO inventory (id,truck_id,item,category,par,on_hand,updated_at) VALUES (?,?,?,?,?,?,datetime('now')) ON CONFLICT(truck_id,item) DO UPDATE SET par=excluded.par,on_hand=excluded.on_hand,updated_at=datetime('now')`).bind(crypto.randomUUID(),d.truck_id,d.item,d.category||'Other',Number(d.par||0),Number(d.on_hand||0)).run();return Response.json({ok:true});}
  return new Response('Method not allowed',{status:405});
}