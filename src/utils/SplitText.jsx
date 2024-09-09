const SplitText = ({ text, size, customCSS = {} }) => {
    return (
      <>
        {text.split("").map((char, index) => (
          <span key={index} style={{ display: "inline-block", fontSize: size, ...customCSS }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </>
    );
  };
  
  export default SplitText;
  