import User from "@/models/User";
import apiGithub from "@/api";
import { AxiosResponse } from "axios";
import Repository from "@/models/Repository";
import RepositoryFile from "@/models/RepositoryFile";
import Branch from "@/models/Branch";

type GitHubData<T> = Promise<AxiosResponse<T>>;

type Query = Record<string, string | number | null>;

/*
     Takes a github user by name
    */
export const getUserByName = async function (name: string): GitHubData<User> {
  return apiGithub.get(`users/${name}`);
};

/*
     Takes a github repository
    */
export const getRepository = async function (
  ownerName: string,
  repoName: string
): GitHubData<Repository> {
  return apiGithub.get(`repos/${ownerName}/${repoName}`);
};

/*
     Takes user's repositories
    */
export const getUserRepos = async function (
  userName: string,
  query: Query
): GitHubData<Repository[]> {
  return apiGithub.get(`/users/${userName}/repos`, { params: query });
};

/*
     Takes content of repository
    */
export const getReposFiles = async function (
  query: Query
): GitHubData<RepositoryFile[]> {
  return apiGithub.get(
    `/repos/${query.ownerName}/${query.repoName}/contents/${query.path}/?ref=${query.branch}`
  );
};

/*
     Takes branches of repository
    */
export const getReposBranches = async function (
  userName: string,
  repoName: string
): GitHubData<Branch[]> {
  return apiGithub.get(`/repos/${userName}/${repoName}/branches`);
};
