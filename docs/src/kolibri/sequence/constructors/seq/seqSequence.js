import { createMonadicSequence } from "../../util/sequenceUtil/createMonadicSequence.js";

export { seq }

/**
 * Creates a {@link SequenceType} which contains all given arguments as values.
 * The argument list might be empty, resulting in an empty iterator.
 *
 * @constructor
 * @pure
 * @template _T_
 * @param   { ..._T_ } values
 * @returns { SequenceType<_T_> }
 *
 * @example
 * const result = seq(1, 2);
 *
 * console.log(...result);
 * // => Logs '1' '2'
 */
const seq = (...values) => {

  const seqIterator = () => {
    let index = 0;

    const next = () => {
      const result = ( index > values.length -1 )
        ?  { done: true,  value: undefined }
        :  { done: false, value: values[index] };
      index++;
      return result;
    };

    return { next }
  };

  return createMonadicSequence( seqIterator )
};
