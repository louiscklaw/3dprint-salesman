export default ({ children }) => {
  console.log(
    JSON.stringify({
      debug_show: process.env.NEXT_PUBLIC_ENVIRONMENT,
    }),
  );

  return (
    <>
      helloworld
      <pre>{JSON.stringify(process.env)}</pre>
    </>
  );
  return <>Debug show</>;
};
