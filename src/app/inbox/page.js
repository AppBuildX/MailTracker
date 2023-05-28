"use client"
import axios from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FAB from "@/app/components/fab";
import AppPasswordsInstructions from "@/app/components/passwordInstruction";
import SentMailCard from "@/app/components/sentMailCard";

const Inbox = () => {
  const { data: session, status: sessionStatus } = useSession();
  const userMail = session?.user?.email;

  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userMail) {
        try {
          setLoading(true);
          const getInboxes = await axios.get(`/getInboxes/${userMail}`);
          setInbox(getInboxes.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [refresh, userMail]);

  return (
    <main className="bg-white">
      <AppPasswordsInstructions />
      {sessionStatus === "loading" || loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="loader">Loading...</div>
        </div>
      ) : inbox.length === 0 ? (
        <div className="flex flex-col justify-center items-center px-4 mx-auto sm:px-6 lg:px-8 h-[60vh]">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl text-center">
            No Mails
          </h2>
        </div>
      ) : (
        inbox.map((mail) => {
          const {
            _id,
            content,
            recipient,
            date,
            subject,
            lastSeen,
            openCount,
            isOpen,
          } = mail;
          const originalMessage = content;
          const trackingToRemove = `<img src="${process.env
            .NEXT_PUBLIC_API_URL}/track-email/${userMail}/${_id}" width="1" height="1" style="display: none;">`;

          const messageContent = originalMessage.replace(trackingToRemove, "");
          return (
            <SentMailCard
              key={_id}
              from={userMail}
              to={recipient}
              date={date}
              subject={subject}
              message={messageContent}
              lastSeen={lastSeen}
              openCount={openCount}
              isOpen={isOpen}
            />
          );
        })
      )}
      <FAB onRefresh={() => setRefresh(!refresh)} />
    </main>
  );
};

export default Inbox;
