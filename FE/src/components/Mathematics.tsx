import styled from "styled-components";
import MBG from "../assets/MathBg.jpg";
import num from "../tools/num.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import lodash from "lodash";

export const Mathematics = () => {
  const [state, setState] = useState<Array<{}>>([]);

  useEffect(() => {
    const shuffle = lodash.shuffle(num);

    setState(shuffle);
  }, []);

  const onDrag = (res: any) => {
    console.log(res);

    const data = Array.from(state);

    const [newArr] = data.splice(res.source.index, 1);
    data.splice(res.destination.index, 0, newArr);

    setState(data);
  };

  const check = lodash.isEqualWith(num, state);

  return (
    <div>
      <DragDropContext onDragEnd={onDrag}>
        <Container>
          <Wrapper>
            {check ? <C>Congratulations 😀</C> : null}
            <Holder>
              <Txt>
                Arrange the solutions on the left according to the numbers on
                the right
              </Txt>
              <Flex>
                <Droppable droppableId="dragnDrop">
                  {(props) => (
                    <DNDHolder
                      w="200px"
                      ref={props.innerRef}
                      {...props.droppableProps}
                    >
                      {state?.map((el: any, i: number) => (
                        <Draggable key={el.id} index={i} draggableId={el.id}>
                          {(prov) => (
                            <Num
                              key={el.id}
                              ref={prov.innerRef}
                              {...prov.dragHandleProps}
                              {...prov.draggableProps}
                            >
                              {el.num}
                            </Num>
                          )}
                        </Draggable>
                      ))}
                      {props.placeholder}
                    </DNDHolder>
                  )}
                </Droppable>
                <Equal>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                  <div>= </div>
                </Equal>
                <DNDHolder w="200px">
                  {num.map((el) => (
                    <Num key={el.id}>{el.ans}</Num>
                  ))}
                </DNDHolder>
              </Flex>
            </Holder>
          </Wrapper>
        </Container>
      </DragDropContext>
    </div>
  );
};

const C = styled.div`
  position: absolute;
  top: 30px;
  font-size: 40px;
  color: #046b44;
`;

const Equal = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  color: white;
`;

const Num = styled.div`
  font-size: 50px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 50px;
`;

const Txt = styled.div`
  font-size: 20px;
  color: white;
`;

const DNDHolder = styled.div<{ w: string }>`
  width: ${({ w }) => w};
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const Holder = styled.div`
  background-color: #05c1db;
  width: 800px;
  height: 500px;
  border: 8px solid white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${MBG});
  background-size: cover;
  background-repeat: no-repeat;
`;
