import Playground from './../models/playground';

export function createPlayground(req, res, next) {
  Playground.create({
    category: req.body.category,
    title: req.body.title,
    location: req.body.location,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  })
    .then(playground => res.json(playground))
    .catch(err => next(err));
}

export function getPlaygrounds(req, res, next) {
  Playground.find()
    .then(playgrounds => res.json(playgrounds))
    .catch(error => next(error));
}

export function getPlaygroundsByCategoryName(req, res, next) {
  const category = req.params.category;
  Playground.find({ category })
    .then(playgrounds => res.json(playgrounds))
    .catch(error => next(error));
}
