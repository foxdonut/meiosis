const createApp = update => {
  const air = nest(createTemperature, update, ["air"]);
  const water = nest(createTemperature, update, ["water"]);

  return {
    model: () => R.merge(air.model(), water.model()),
    view: model => (
      <div>
        {air.view(model)}
        {water.view(model)}
      </div>
    )
  };
};
