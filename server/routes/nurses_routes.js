var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/nurses/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.collection('nurses').findOne(details, (err, nurse) => {
            if (err) {
                res.send({ 'error': 'An error has ocurred'});
            } else {
                res.send(nurse);
            }
        });
    });

    app.get('/nurses', (req, res) => {
        const id = req.params.id;
        const details = {};
        db.collection('nurses').find(details).toArray((err, nurses) => {
            if (err) {
                res.send({ 'error': 'An error has ocurred'});
            } else {
                res.send(JSON.stringify(nurses));
            }
        });
    });

    app.post('/nurses', (req, res) => {
        const nurse = { name: req.body.name, schedule: req.body.schedule };
        db.collection('nurses').insertOne(nurse, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has ocurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/nurses/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('nurses').deleteOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Nurse ' + id + ' deleted!');
			}
		});
	});

	app.put('/nurses/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		const note = { name: req.body.name, schedule: req.body.schedule };
		db.collection('nurses').updateOne(details, note, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});
}