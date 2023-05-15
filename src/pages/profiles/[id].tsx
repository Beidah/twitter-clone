import { GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { Head } from "next/document";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error";

const ProfilePage: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({ id }) => {
  const { data: profile } = api.profile.getById.useQuery({ id });

  if (profile == null || profile.name == null)
    return <ErrorPage statusCode={ 404 } />;

  return (
    <>
      <Head>
        <title>{ `Twitter Clone - ${profile.name}` }</title>
      </Head>
      { profile.name }
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context: GetStaticPropsContext<{ id: string; }>) {
  const id = context.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/"
      }
    };
  }

  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    }
  };
}

export default ProfilePage;