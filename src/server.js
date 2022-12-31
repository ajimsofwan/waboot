const express = require('express');
const morgan = require('morgan');


const Router = require('express').Router;

const router = new Router();

const app = express();


process.env.NODE_ENV !== 'prod' && app.use(morgan('dev'));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

router.route('/webhook').post((req, res) => {

	const { utext } = req.body;

	if ( utext.toLowerCase() == 'ping') {
		return res.json({
			success:true,
			atext:'pong'
		});
	}

	return res.json({
		success:true,
		atext:'command not found'
	});

});

app.use('/', router);

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
