import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import img from "../assets/pic.jpg";
import { getKids, sortedKids } from "../../api/API";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import lodash from "lodash";

function MainApp() {
  const [sortedState, setSortedState] = useState<Array<{}>>([]);
  const [state, setState] = useState<Array<{}>>([]);
  const [imageState, setImageState] = useState<Array<{}>>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    getKids().then((res) => {
      let newRes = lodash.shuffle(res);
      setState(newRes);
    });

    sortedKids().then((res) => {
      setSortedState(res);
    });

    sortedKids().then((res) => {
      console.log(res[0].image);

      setImageState(res);
    });
  }, []);

  const onDrag = (res: any) => {
    console.log("drag", res);

    const { source, destination } = res;
    let data = Array.from(state);
    let [newData] = data.splice(source.index, 1);
    data.splice(destination.index, 0, newData);

    setState(data);
  };

  const checker = lodash.isEqualWith(state, sortedState);

  useEffect(() => {
    if (checker === true) {
      setTime(time);
    }
    if (checker === false) {
      const interval = setInterval(() => {
        setTime(time + 1);
        clearInterval(interval);
      }, 1000);
    }
  }, [time]);

  return (
    <DragDropContext onDragEnd={onDrag}>
      <Container>
        <Main>
          <Droppable droppableId="stateDragnDrop">
            {(el) => {
              return (
                <Holder {...el.droppableProps} ref={el.innerRef}>
                  <Text>Words</Text>

                  {state?.map((el: any, i: number) => (
                    <Draggable draggableId={el._id} key={el._id} index={i}>
                      {(prov: any) => (
                        <Box
                          key={el._id}
                          {...prov.dragHandleProps}
                          {...prov.draggableProps}
                          ref={prov.innerRef}
                        >
                          {el.name}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {el.placeholder}
                </Holder>
              );
            }}
          </Droppable>
          <Holder>
            <Text>Image</Text>

            <FlexImage>
              {imageState?.map((el: any) => (
                <Image key={el._id} src={el.image} />
              ))}
            </FlexImage>
          </Holder>
          {checker ? <> You win</> : ""}
        </Main>
        <Time>{checker ? time : time}</Time>
      </Container>
    </DragDropContext>
  );
}

export default MainApp;

const Time = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 40px;
`;

const FlexImage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  height: 50px;
  border: 1px solid silver;
  border-radius: 5px;
  margin-top: 7px;
`;

const Box = styled.div`
  margin: 10px;
  border: 1px solid silver;
  padding: 0 10px;
  border-radius: 5px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div``;

const Holder = styled.div`
  margin: 10px 30px;
  border: 1px solid silver;
  padding: 10px;
  border-radius: 5px;
`;

const Main = styled.div`
  border: 1px solid silver;
  border-radius: 5px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;
