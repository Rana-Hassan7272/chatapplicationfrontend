import { Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "@mui/material";

// Hidden input for accessibility purposes
export const VisualHidden = styled("input")({
  border: '0',
  height: '1px',
  margin: '-1px',
  clip: 'rect(0,0,0,0)',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap'
});

// Styled Link component
export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Styled input box component
export const InputBox = styled("input")`
  height: 100%;
  width: 100%;
  outline: none;
  border-radius: 1.5rem;
  padding: 0 3rem;
  border: 1px solid transparent;
  background-color: rgba(247, 247, 247, 1);
`;



export const SearchFeild = styled("input")`
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

export const CurveButton = styled("button")`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #007BFF;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }

  &:focus {
    outline: none;
  }
`;

export const Dot = styled(Skeleton)`
  animation: bounce 1.4s infinite ease-in-out both;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);

  &:nth-of-type(1) {
    animation-delay: -0.32s;
  }
  &:nth-of-type(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

