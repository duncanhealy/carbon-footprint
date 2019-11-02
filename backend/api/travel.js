export default (app, db) => {
  /**
   * @swagger
   *
   * /travels:
   *   get:
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   */
  app.get("/travels", (req, res) =>
    db.travel.findAll({
      attributes: { exclude: ['personId', 'departureLocation', 'arrivalLocation']},
      include: [
        db.person,
        {
          model: db.location,
          as: 'Arrival'
        }, {
          model: db.location,
          as: 'Departure'
        }
      ]
    }).then((result) => res.json(result))
  );

  /**
   * @swagger
   *
   * /travel/{id}:
   *   get:
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   */
  app.get("/travel/:id", (req, res) =>
    db.travel.findByPk(req.params.id).then((result) => res.json(result))
  );

  /**
   * @swagger
   *
   * /travel/{id}:
   *   post:
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   */
  app.post("/travel", (req, res) =>
    db.travel.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => res.json(result))
  );

  /**
   * @swagger
   *
   * /travel/{id}:
   *   put:
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   */
  app.put("/travel/:id", (req, res) =>
    db.travel.update({
      title: req.body.title,
      content: req.body.content
    },
      {
        where: {
          id: req.params.id
        }
      }).then((result) => res.json(result))
  );

  /**
   * @swagger
   *
   * /travel/{id}:
   *   delete:
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   */
  app.delete("/travel/:id", (req, res) =>
    db.travel.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}