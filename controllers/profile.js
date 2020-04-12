const handleProfileGET = (req, res, db) => {
   const { id } = req.params;
   let found = false;
   
   // memo to self; ({id}) means ({id: id}});
   db.select('*').from('users').where({id} )
   .then(user => {
       console.log(user);      

       if(user.length) {
           res.json(user[0]);
       } else {
           res.status(400).json('Not Found');
       }
   })
   .catch(err => res.status(400).json('Error Geeting User'));
}

module.exports = {
   handleProfileGET
}