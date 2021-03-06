export default (app, authCheck, db) => {

  /**
   * Get the Users database ID for further querying.
   * This middleware needs to be applied to any request to prevent leaking!
   */
  function checkUser(req, res, next) {
    var usersub = req.user['sub'];
    db.person.findOne({
      where: {
        oauthid: usersub
      }
    }).then(function (person) {
      if (person) {
        req.user.dbid = device.dataValues.id;
      }
      next()
    });
  }

  /**
   * All the options needed to Produce a result that is not bloated
   */
  const journeyOptions = {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'personId'] },
    order: [[db.travel, 'sequence', 'asc']],
    include: [
      {
        model: db.person,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.travel,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'journeyId', 'departureLocation', 'arrivalLocation'] },
        include: [
          {
            model: db.location,
            as: 'Departure',
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          },
          {
            model: db.location,
            as: 'Arrival',
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
          }
        ]
      }
    ]
  }

  app.get("/journeys", authCheck, checkUser, (req, res) => {
    if (req.user.dbid) {
      journeyOptions.where = { personId: req.user.dbid };
      db.journey.findAll(journeyOptions).then((result) => res.json(result))
    } else {
      res.json([]);
    }
  });

  app.get("/journey/:id", authCheck, checkUser, (req, res) => {
    if (req.user.dbid) {
      journeyOptions.where = { personId: req.user.dbid };
      db.journey.findByPk(req.params.id, journeyOptions).then((result) => res.json(result))
    } else {
      res.json({});
    }
  });

  app.post("/journey", authCheck, (req, res) =>
    db.journey.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => res.json(result))
  );

  app.put("/journey/:id", authCheck, (req, res) =>
    db.journey.update({
      title: req.body.title,
      content: req.body.content
    },
      {
        where: {
          id: req.params.id
        }
      }).then((result) => res.json(result))
  );

  app.delete("/journey/:id", authCheck, (req, res) =>
    db.journey.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}