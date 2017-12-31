type node('a) =
  | Nil
  | Cons('a, t('a))
and t('a) = unit => node('a);

let rec forEach = (f, seq) =>
  switch (seq()) {
  | Nil => ()
  | Cons(element, next) =>
    f(element);
    forEach(f, next);
  };

let rec map = (f, seq) =>
  switch (seq()) {
  | Nil => () => Nil
  | Cons(element, next) => () => Cons(f(element), map(f, next))
  };

let count = seq => {
  let n = ref(0);
  seq |> forEach(_x => n := n^ + 1);
  n^;
};

let rec toList = seq =>
  switch (seq()) {
  | Nil => []
  | Cons(element, next) => [element, ...toList(next)]
  };
