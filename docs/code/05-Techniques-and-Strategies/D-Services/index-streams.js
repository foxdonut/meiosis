/* global b, m, R */

const I = x => x;
const o = (f, g) => x => f(g(x));
const K = x => () => x;

function dropRepeats(s) {
  var ready = false;
  var d = m.stream();
  s.map(function (v) {
    if (!ready || v !== d()) {
      ready = true;
      d(v);
    }
  });
  return d;
}

const humanList = s => xs =>
  xs.length > 1
    ? xs.slice(0,-1).join(", ") + " "+s+" " + xs.slice(-1)
    : xs.join("");

const pipe = xs => xs.reduceRight(o, I);
const $ =
  { prop: k => f => o =>
    ({ ...o, [k]: f(o[k]) })
    , get: lens => o => {
    var y;
    lens (  x => y = x ) (o);
    return y;
  }
  };

const $boxes = $.prop ("boxes");
const $description = $.prop ("description");
const $colors = $.prop ("colors");

const Action = {
  addBox: x =>
    pipe(
      [ K(x)
        , ys => xs => xs.concat(ys)
        , $boxes
      ]
    ),
  removeBox: i =>
    $boxes( xs => xs.filter( (x,j) => i != j ) )
};

const View = update => state =>
  m( ".app" + b.d("grid").ff("Helvetica")
    , m("nav.header"
        + b
          .d("flex")
          .jc("space-between")
          .ai("center")
          .bc("purple")
          .c("white")
          .p("1em")

      , m("h1"+b.m(0), "Boxes")
      , $.get( $colors ) (state)
      .map(
        x => m("button"
            + b
              .bc(x)
              .c("white")
              .w("2em")
              .h("2em")
              .fs("2em")
              .m(0)
              .border("none")
          ,
        { onclick: pipe([Action.addBox(x), update]) }, "+"
        )
      )
    )
    ,m("p", $.get($description) (state) )
    ,m("" + b.d("grid").gridTemplateColumns("repeat(3, 1fr)")
      .alignItems("center")
      .justifyItems("center")
      .padding("1em")
      .gridRowGap("1em")
      .maxHeight("14em")
      .overflowY("auto")

      ,$.get( $boxes ) (state) .map(
      (x, i) =>
        m("" + b.bc(x).c("white").w("4em").h("4em"),
          { onclick:
              pipe([ K( Action.removeBox(i) ), update ])
          }
        )
    )
    )
  );

const update = m.stream();
const T = (x,f) => f(x);

const StatsService = {
  start(model){
    return dropRepeats(
      model.map( x => x.boxes )
    )
      .map( R.countBy(I) )
      .map( R.assoc("stats") );
  },
  initial(state){
    return state.colors
      .map( R.objOf ).map( K(0) ).reduce(R.merge, {});
  }
};

const LocalStorageService = {
  start(model){
    const update = m.stream();

    dropRepeats(
      model.map( R.pick(["boxes"]) )
    )
      .map(
        x => localStorage.setItem("v1", JSON.stringify(x) )
      );

    return update;
  },

  initial(){

    return [ localStorage.getItem("v1") ]
      .filter( Boolean )
      .map( JSON.parse )
      .concat({ boxes: [] })
      .shift();

  }
};

const DescriptionService = {
  start(model){
    return dropRepeats(
      model.map( x => x.stats )
    )
      .map(
        R.pipe(
          R.toPairs,
          R.groupBy( R.last ),
          R.map( R.map(R.head) ),
          R.map( humanList("and") ),
          R.toPairs,
          R.map( R.join(" ") ),
          humanList("and"),
          x => x + ".",
          R.objOf("description"),
          R.mergeDeepLeft
        )
      );
  },
  initial(){
    return {
      description: ""
    };
  }
};

const services = {
  localStorage: LocalStorageService,
  statsService: StatsService,
  descriptionService: DescriptionService
};

const initialModel = () => {
  const state =
    {  boxes: []
      , colors:
      [ "black"
        , "red"
        , "green"
        , "orange"
        , "pink"
      ],
    };
  return {
    ...state,
    ...Object
      .entries(services)
      .map(
        ([_k,v]) => v.initial(state)
      )
      .reduce(R.merge, {})
  };
};

const model = m.stream.scan( T, initialModel(), update );

Object.values(services).map( s => s.start(model).map(update) );

const view = model.map(View(update));
const element = document.getElementById("app");
view.map( x => m.render(element, x) );
