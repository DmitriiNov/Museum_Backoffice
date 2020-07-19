const { Router } = require('express')
const { model } = require('mongoose')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if(user){
        res.send('Успешно')
        //res.redirect('/games')
        //res.redirect('/login')
    }else{
        res.send('Не прошел по куки')
        //res.render('main', {
        //    layout: 'layouts/login',
        //    title: 'Вход'
        //})
    }
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    login = req.body.login
    password = req.body.password
    user = await User.findOne({login: login})
    if (user){
        if (user.validatePassword(password)){
            req.session.userId = user._id
            res.send('Залогинился')
            //res.redirect('/games')
        }else{
            res.send('Неправильный пароль')
        }
    }else{
        req.session.userId = null
        res.send('Неа, нихуя')
        //res.redirect('/login')
    }
})

module.exports = router