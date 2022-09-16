function isDevelopment() {
  return process.env.NEXT_PUBLIC_ENVIRONMENT == 'development';
}

export default ({ children }) => {
  if (!isDevelopment()) {
    return <></>;
  }
  return <>{children}</>;
};
