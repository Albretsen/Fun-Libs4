import useLib from '../src/hooks/useLib';

describe('Lib testing', () => {
  it('Lib parser', () => {
    const { parseTextToLib } = useLib();

    const result = parseTextToLib("How (adjective 1) aren't you! I have never seen someone so (adjective 1), Mr. (Name).");

    expect(JSON.stringify(result)).toBe(`{"parsed_text":["How ",""," aren't you! I have never seen someone so ","",", Mr. ","","."],"parsed_prompts":[{"adjective 1":[1]},{"adjective 1":[3]},{"Name":[5]}]}`);
  });
});