import React from "react";

const Rewards = () => {
  // need to get rewardPoints from API call
  const rewardPoints = 70;
  const levels: Record<string, string> = {
    0: "Bronze",
    500: "Silver",
    1000: "Gold",
    1500: "Platinum"
  };
  function getRewardLevel(awardPoints: number): string {
    if (awardPoints < 500) {
      return "Bronze";
    } else if (awardPoints >= 500 && awardPoints < 1000) {
      return "Silver";
    } else if (awardPoints >= 1000 && awardPoints < 1500) {
      return "Gold";
    } else {
      return "Platinum";
    }
  }
  function calculatePointsToNextLevel(currentPoints: number, levels: Record<string, string>) {
    const levelsArray = Object.keys(levels).map(Number).sort((a, b) => a - b);
    const currentLevelIndex = levelsArray.findIndex(level => currentPoints < level);

    if (currentLevelIndex === -1) {
      return 0; // Already at the highest level
    }

    const nextLevelPoints = levelsArray[currentLevelIndex];
    const pointsToNextLevel = nextLevelPoints - currentPoints;

    return pointsToNextLevel;
  }

  function getNextLevel(currentPoints: number, levels: Record<string, string>): string {
    const levelPoints = Object.keys(levels).map(Number).sort((a, b) => a - b);
    const currentLevelIndex = levelPoints.findIndex(level => currentPoints < level);

    if (currentLevelIndex === -1) {
      return "Platinum"; // Already at the highest level
    }

    const nextLevelPoints = levelPoints[currentLevelIndex];
    const nextLevel = levels[nextLevelPoints.toString()];

    return nextLevel;
  }
  const level = getRewardLevel(rewardPoints)
  const pointsToNextLevel = calculatePointsToNextLevel(rewardPoints, levels)
  const nextLevel = getNextLevel(rewardPoints, levels);
  const percentage = rewardPoints * 100 / (rewardPoints + pointsToNextLevel)

  return (
  <div className="flex flex-col">
    <h2 className="text-2xl py-7 font-bold">MY POINT</h2>
    <div className="flex flex-wrap space-x-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center justify-start py-9 px-8 h-full hover:bg-gray-100" style={{ width: '20rem', height: '20rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#4328CF" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
        <div className="text-lg mb-2 py-3 pt-6">Available Points</div>
        <p className="font-bold text-3xl mb-2">
          {rewardPoints}
        </p>
        <p className="text-gray-700 text-base">
          Total Points
        </p>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center justify-start py-9 px-8 h-full hover:bg-gray-100" style={{ width: '20rem', height: '20rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#4328CF" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
        <div className="text-lg mb-2 py-3 pt-6">Redeemed Points</div>
        <p className="font-bold text-3xl mb-2">
          50
        </p>
      </div>
    </div>
    <h2 className="text-2xl py-7 font-bold">MY LEVELS</h2>
    <div className="flex flex-wrap space-x-4 h-full w-[1200px]">
      <div className="rounded overflow-hidden shadow-lg flex flex-col items-center justify-start py-9 px-8 h-full hover:bg-gray-100" style={{ width: '650px', height: '20rem' }}>
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z" stroke="#1C274C" stroke-width="1.5"/>
          <path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="#1C274C" stroke-width="1.5"/>
          <path d="M12 16.0678L8.22855 19.9728C7.68843 20.5321 7.41837 20.8117 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4602C5.69597 20.2495 5.65848 19.8695 5.5835 19.1095C5.54117 18.6804 5.52 18.4658 5.45575 18.2861C5.31191 17.8838 5.00966 17.5708 4.6211 17.4219C4.44754 17.3554 4.24033 17.3335 3.82589 17.2896C3.09187 17.212 2.72486 17.1732 2.52138 17.0486C2.05772 16.7648 1.87548 16.1662 2.08843 15.6266C2.18188 15.3898 2.45194 15.1102 2.99206 14.5509L5.45575 12" stroke="#1C274C" stroke-width="1.5"/>
          <path d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20.9084C17.3315 21.1289 17.9096 20.9402 18.1837 20.4602C18.304 20.2495 18.3415 19.8695 18.4165 19.1095C18.4588 18.6804 18.48 18.4658 18.5442 18.2861C18.6881 17.8838 18.9903 17.5708 19.3789 17.4219C19.5525 17.3554 19.7597 17.3335 20.1741 17.2896C20.9081 17.212 21.2751 17.1732 21.4786 17.0486C21.9423 16.7648 22.1245 16.1662 21.9116 15.6266C21.8181 15.3898 21.5481 15.1102 21.0079 14.5509L18.5442 12" stroke="#1C274C" stroke-width="1.5"/>
          </svg>
        <div className="text-lg mb-2 py-3 pt-6">Current Level</div>
        <p className="font-bold text-3xl mb-2">
          {level}
        </p>
        <p>{pointsToNextLevel} points more needed to unlock the next level</p>
        <div className="flex justify-between mb-1 w-full">
          <span className="text-base font-medium text-blue-700 dark:text-white">{rewardPoints} points</span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">{nextLevel}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '${percentage}%' }}></div>
        </div>

      </div>
    </div>
  </div>
  )
};

export default Rewards;