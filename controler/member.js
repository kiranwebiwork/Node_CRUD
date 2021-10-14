
const member = [
    {
        id:"1" ,
        description:"Helloo therere nyourwe nddjsndjj Dummy data njjnjsn hnjndjsn" ,
       },
    {
        id:"2" ,
        description:"Helloo therere nyourwe nddjsndjj Dummy data njjnjsn hnjndjsn" ,


    },
    {
        id:"3" ,
        description:"Helloo therere nyourwe nddjsndjj Dummy data njjnjsn hnjndjsn" ,
    }
]

module.exports =member



// All Data  for the member


    // 1 take all member of all member object

    // static getblog(req, res) {
    //     res.json(member)
    //     // Route.get('/:id' , IndexContoller.single);
    // }


    // 2 Take on single one from the member array

    // static getblogbyid(req, res) {
    //     // res.json(member.filter(memberss =>console.log(memberss.id)));
    //     // req.params.id === res.json(member.filter(single=>{}))


    //     const found = member.some(single => Number(single.id) === parseInt(req.params.id))
    //     if (found) {
    //         res.json(member.find(single => Number(single.id) === parseInt(req.params.id)))
    //     } else {
    //         // res.json("wrong id");
    //         res.status(400).json("Wrong id you pushed")
    //     }

    // }

      // 3 Post Request to create a new member 

    // static postblog(req, res) {
    //     const newmember = {
    //         id: req.body.id,
    //         description: req.body.description,
    //     }

    //     // const id = req.body.id;
    //     // const description = req.body.description;

    //     if (member.find(ss => ss.id === newmember.id)) {
    //         res.json("memeber is exists")
    //     } else {
    //         member.push(newmember);
    //         res.json(member);
    //     }
    // }

     //4 Update a particular mamber  post
   
    // static updateblogbyid(req, res) {
    //     const found = member.some(single => Number(single.id) === parseInt(req.params.id))
    //     if (found) {
    //         const newupdate = req.body;
    //         console.log(newupdate);
    //         // res.json(member.find(single=>Number(single.id) === parseInt(req.params.id)))
    //         console.log("id: ", req.params.id)
    //         member.forEach((memberss) => {
    //             if (Number(memberss.id) === parseInt(req.params.id)) {
    //                 console.log(memberss.description);

    //                 memberss.description = newupdate.description ? newupdate.description : memberss.description;

    //                 res.send({ msg: "Data is Updated:", member });
    //             }
    //         });
    //     } else {
    //         res.status(400).json("Wrong id you pushed")
    //     }
    // }

    // 5 Delete a particular member

    // static deleteblogbyid(req, res) {
    //     const found = member.some(single => Number(single.id) === parseInt(req.params.id))
    //     if (found) {
    //         res.json({
    //             msg: "Blog Deleted",
    //             member: member.filter(single => Number(single.id) !== parseInt(req.params.id))
    //         })
    //     } else {
    //         res.status(400).json("Wrong id you pushed")
    //     }
    // }
