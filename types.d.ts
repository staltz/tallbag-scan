import {Source} from 'tallbag';
import {Metadata} from 'shadow-callbag';

export default function scan<I, O>(
  reducer: (acc: O, d: I) => O,
  seed?: O,
): (source: Source<I, Metadata>) => Source<O, Metadata>;
