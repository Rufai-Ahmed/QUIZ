import styled from "styled-components";
import pic from "../../assets/3856303.jpg";
import data from "../../tools/data.json";
import { Link } from "react-router-dom";

export const SelectPage = () => {
  return (
    <div>
      <Container>
        <Wrapper>
          <Text>Select a game</Text>

          <ImageSection>
            {data.map((el: any) => (
              <ImageHolder to={el.id}>
                <Img src={el.Img} />

                <ImgTxt>{el.ImgTxt}</ImgTxt>
              </ImageHolder>
            ))}
          </ImageSection>
        </Wrapper>
      </Container>
    </div>
  );
};

const ImgTxt = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  padding: 10px 0;
`;

const Img = styled.div<{ src: string }>`
  height: 200px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  border-radius: 10px 10px 0 0;
  background-image: url(${({ src }) => src});
`;

const ImageHolder = styled(Link)`
  border: 8px solid #d49230;
  width: 200px;
  min-height: 100px;

  border-radius: 20px;
  text-decoration: none;
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  padding: 70px 0;
  justify-content: center;
`;

const Text = styled.div`
  width: 100%;
  height: 32vh;
  display: flex;
  justify-content: center;
  align-items: end;

  font-size: 40px;
  font-family: "Fredoka", sans-serif;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(17px);
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${pic});
  background-size: contain;
`;
