import axios from "@/lib/axiosInstance";
import FAB from "@/app/components/fab";
import AppPasswordsInstructions from "@/app/components/passwordInstruction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SentMailCard from "@/app/components/sentMailCard";

const Inbox = async () => {
  const session = await getServerSession(authOptions);
  const userMail = session.user.email;
  const getInboxes = await axios.get(`/getInboxes/${userMail}`);
  const { data } = getInboxes;
  return (
    <main className="bg-white">
      <AppPasswordsInstructions />
      {data.length === 0
        ? <div className="flex flex-col justify-center items-center px-4 mx-auto sm:px-6 lg:px-8  h-[60vh]">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl text-center">
                No Mails
              </h2>
            </div>
          </div>
        : data.map((mail, index) => {
            const originalMessage = mail.content;
            const trackingToRemove = `<img src=${process.env
              .NEXT_PUBLIC_API_URL}/track-email/${userMail}/${mail._id} width="1" height="1" style="display: none;">`;

            const messageContent = originalMessage.replace(
              trackingToRemove,
              ""
            );
            return (
              <SentMailCard
                key={mail._id}
                from={userMail}
                to={mail.recipient}
                date={mail.date}
                subject={mail.subject}
                message={messageContent}
                lastSeen={mail.lastSeen}
                openCount={mail.openCount}
                isOpen={mail.isOpen}
              />
            );
          })}
      <FAB />
    </main>
  );
};

export default Inbox;
