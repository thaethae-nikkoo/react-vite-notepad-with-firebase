import useTheme from "../hooks/useTheme";

export default function Footer() {
  let { isDark } = useTheme();
  return (
    <>
      <p
        className={` text-xs lg:text-md shadow-lg p-3 mt-3 rounded-md space-x-10 text-center ${
          isDark ? "bg-cardbg  text-white" : "text-primary"
        }`}
      >
        &copy; Copyright{" "}
        <span className="text-priamry">ThaeNandarSoe@Nikkoo</span>. All right
        reserved.
      </p>
    </>
  );
}
