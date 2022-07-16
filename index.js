const express= require("express")
 const uuid= require("uuid")

 const app= express()
 const port= 3000
 app.use(express.json())

 const cheking=(request,response,next)=>{
   const {id}= request.params
   const index= pedidos.findIndex(user=>user.id === id)

   if(index < 0){
      return response.status(404).json({mensagem:"Pedido não encontrado"})
   }

   request.userIndex= index
   request.user= id

   next()
 }

 const method=(request,respone,next)=>{
   console.log(` [${request.method}]-/order`)

   next()
 }

 const pedidos= []
 app.get("/users",method,(request,response)=>{
   return response.json(pedidos)
 })

 app.post("/users",method,(request,response)=>{
   const{order,clientName,price}= request.body
  
   const novoPedido={id:uuid.v4(),order,clientName,price,status:"Em preparação"}

   pedidos.push(novoPedido)

   return response.status(201).json(novoPedido)
 })

 app.put("/users/:id", cheking,method,(request,response)=>{
   const {id}= request.params
   const{order,clientName,price,}= request.body
   const update= {id,order,clientName,price,status:"Em preparação"}

   const index= request.userIndex
   pedidos[index]= update
   return response.json(update)
 })

 app.delete("/users/:id", cheking,method,(request,response)=>{
   const index= request.userIndex
   pedidos.splice(index,1)

   return response.status(204).json()
 })

 app.get("/users/:id", cheking,method,(request,response)=>{
   const index= request.userIndex
   const specificOrder= pedidos[index]

   return response.json(specificOrder)
 })

 app.patch("/users/:id", cheking,method,(request,response)=>{
   const index= request.userIndex
   const id=request.user
   const {order,clientName,price}=pedidos[index]
   const status={id,order,clientName,price,status:"Pronto"}

   pedidos[index]= status
   return response.json(status)

 })

 app.listen(port, ()=>{
   console.log("🚀")
 })
                        