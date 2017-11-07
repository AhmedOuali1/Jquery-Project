var express = require('express');
var router = express.Router();
var Etudiant = require('../models/etudiant');

/* GET home page. */
router.get('/', function(req, res, next) {
    // var etudiant = new Etudiant({
    //     firstName : 'ahmed',
    //     lastName : 'ouali',
    //     intro: 'un bon etudiant',
    //     email : 'ahmed.ouali.pro@gmail.com',
    //     departement: 'GI3 RTC',
    //     phone: '44248058'
    // });
    // etudiant.save();
  res.render('index', { title: 'Express' });
});


router.get('/etudiants', function(req, res, next) {
    Etudiant
    .find()
    .exec(function (err, etudiants) {
        if (err) {
            return res.status(500).json({
                title: 'erreur',
                error: err
            });
        }
        res.status(200).json({
            message: 'recherche etudiants terminé avec succes',
            obj: etudiants
        });
    });
});


router.post('/etudiant', function(req, res, next) {
    console.log(req)
  var etudiant = new Etudiant({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        intro: req.body.intro,
        email : req.body.email,
        departement:req.body.departement,
        phone:req.phone
    });
    
    etudiant.save(function(err, result){
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                obj: etudiant,
                error: err.message,
                message: err.message
            });
        }
        res.status(201).json({
            title: 'success',
            message: 'Etudiant Ajouté',
            obj: result
        });
    });
    
});


router.post('/delete/etudiant',function(req, res, next){
     var ids = req.body['idChecked[]']
     var etudiantSupp = []
     
  
     ids.forEach(function(element) {
         etudiantSupp.push(element);
         Etudiant.findById(element, function(err, etudiant){
         
         if(etudiant) {
             etudiant.remove(function(err, result){
            if(!err) {
                etudiantSupp.push(element);
            }
            
         });
         }
        
        
     });
          
    });
    return res.status(201).json({
                title: 'succes',
                message: 'Etudiant Supprimé',
                obj: etudiantSupp
            });
    
     
});

module.exports = router;
