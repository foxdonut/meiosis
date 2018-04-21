const createApp = update => {
  const air = nest(createTemperature, update, "air", I);
  const water = nest(createTemperature, update, "water", I);

  return {
    model: () => P(air.model(), water.model()),
    view: model => (
      <div>
        {air.view(model)}
        {water.view(model)}
      </div>
    )
  };
};
